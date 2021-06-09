import socket, cv2, struct, pickle, threading

from time import sleep

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cam = cv2.VideoCapture(0)
s.connect(('192.168.1.4', 1234))

def sending_photo():
    while True:
        _, photo = cam.read()
        data = b''

        cv2.imwrite('client_temp.jpg', photo)

        with open('client_temp.jpg', 'rb') as fp:
            data = fp.read()
            photo_length = struct.pack('>L', len(data))

        s.send(photo_length + data)

        sleep(0.01)


def receiving_photo():

    PAYLOAD = 4
    data = b''

    while True:

        while len(data) <  PAYLOAD:
            data += s.recv(4096)

        msg_size = data[:PAYLOAD]
        data = data[PAYLOAD:]

        msg_size = pickle.unpack('>L', msg_size)[0]

        while len(data) < msg_size:
            data += s.recv(4096)

        with open('server_temp.jpg', 'wb') as fp:
            fp.write(data[:msg_size])

        data = data[msg_size:]
        print(msg_size)

        cv2.imshow('photo', cv2.imread('server_temp.jpg'))
        key = cv2.waitKey(1)
        if key == 27:
            cv2.destroyAllWindows()
            break


receiving_thread = threading.Thread(target=receiving_photo)
receiving_thread.start()

sending_photo()
