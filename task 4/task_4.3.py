import cv2
import numpy as np

iron = cv2.imread('./iron.jpg')
man = cv2.imread('./man.jpg')

man_iron = np.hstack((iron, man))
iron_man = np.vstack((iron, man))

cv2.imshow('photo', iron)
cv2.waitKey()
cv2.imshow('photo', man)
cv2.waitKey()
cv2.imshow('photo', iron_man)
cv2.waitKey()
cv2.imshow('photo', man_iron)
cv2.waitKey()
cv2.destroyAllWindows()