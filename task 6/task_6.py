from smtplib import SMTP_SSL
from email.message import EmailMessage
from openwa import WhatsAPIDriver
import os, json, time, subprocess, cv2

my_server = SMTP_SSL(host='smtp.gmail.com')

# list required of vaiable for email

password = ''
username = ''

send_to = ''
send_by = ''

body = 'Welcome Back'
subject = 'Welcome'

# list required variable for whatsapp

# enter the phone number of the person you want to send the message
contact_number = ''
message = 'Welcome Back'

# model parameter
model_to_use = 'suyash.xml'


def send_email():
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = send_by
    msg['To'] = send_to
    msg.set_content(body)
    my_server.login(username, password)
    my_server.send_message(msg)


def send_whatsapp():
    os.environ['SELENIUM'] = 'chromedriver.exe'
    driver = WhatsAPIDriver(client='chrome')
    driver.wait_for_login()
    dd = driver.get_chat_from_phone_number(contact_number)
    dd.send_message(message)


def create_ec2():

    ec2 = json.loads(subprocess.getoutput('aws ec2 run-instances --image-id ami-0ad704c126371a549 --instance-type t2.micro --subnet-id subnet-7a2a2312'))

    ec2_id  = ec2['Instances'][0]['InstanceId']

    ebs = json.loads(subprocess.getoutput('aws ec2 create-volume --availability-zone ap-south-1a --size 2'))
    ebs_id = ebs['VolumeId']

    time.sleep(30)

    _ = subprocess.getoutput(f'aws ec2 attach-volume --device /dev/sdh --instance-id {ec2_id} --volume-id {ebs_id}')


face_classifier = cv2.CascadeClassifier('face.xml')
suyash_model = cv2.face_LBPHFaceRecognizer.create()
suyash_model.read('suyash.xml')


def face_detector(img, size=0.5):

    # Convert image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)
    if faces is ():
        return img, []

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 255), 2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200, 200))
    return img, roi


# Open Webcam
cap = cv2.VideoCapture(0)

while True:

    try:
        _, frame = cap.read()
        image, face = face_detector(frame)

        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
        results = suyash_model.predict(face)

        if results[1] < 500:
            confidence = int(100 * (1 - (results[1])/400))

        if confidence > 85:
            send_email()
            print('email sended')
            send_whatsapp()
            print('whats message sent')
            create_ec2()
            print('ec2 create and attached')
            break

        if cv2.waitKey(1) == 13:  # 13 is the Enter Key
            break

    except Exception as e:
        cv2.putText(image, "No Face Found", (220, 120),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2)
        cv2.imshow('Face Recognition', image)
        print(e)

cap.release()
cv2.destroyAllWindows()
