import cv2
import numpy as np

img = np.full(shape=(400, 550, 3), fill_value=[255, 255, 255], dtype="uint8")

red = (0, 0, 255)
img2 = cv2.circle(img=img, center=(380, 100), radius=80, color=red, thickness=-1, lineType=cv2.LINE_AA)
img2 = cv2.line(img=img, pt1=(400, 100), pt2=(200, 200), color=red, thickness=6, lineType=cv2.LINE_AA)
img2 = cv2.line(img=img, pt1=(430, 100), pt2=(500, 220), color=red, thickness=6, lineType=cv2.LINE_AA)
img2 = cv2.line(img=img, pt1=(380, 100), pt2=(380, 300), color=red, thickness=20, lineType=cv2.LINE_AA)

cv2.imshow('photo', img2)
cv2.waitKey()
cv2.destroyAllWindows()
