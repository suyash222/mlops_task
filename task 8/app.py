from flask import render_template, request, Flask
from numpy.core.numeric import False_
import task_8

app = Flask(__name__)

@app.route("/")
def main():
    return (render_template('main.html'))


@app.route('/result', methods=['get', 'post'])
def result():
    im = request.files['upload']
    im.save('abc.jpg')

    return str(task_8.main('abc.jpg'))



app.run(debug=False, port=1234)