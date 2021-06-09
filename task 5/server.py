import socket
from threading import Thread
from multiprocessing import Process

connection_list = []
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind(('0.0.0.0', 1234))
s.listen()


def receiving_connection():
	global connection_list
	while True:
		conn, _ =  s.accept()
		connection_list.append(conn)
		th = Thread(target=sending_image, args=[conn])
		th.start()


def sending_image(conn):

    global connection_list
    while True:
        data = conn.recv(4096 * 16)
        for connection in connection_list:
            if connection == conn:
                continue
            connection.send(data)

receiving_connection()