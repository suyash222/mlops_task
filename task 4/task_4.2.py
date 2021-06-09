import cv2
import numpy as np

iron = cv2.imread('./iron.jpg')
man = cv2.imread('./man.jpg')

iron3 = np.copy(iron)
man3 = np.copy(man)

cv2.imshow('photo', iron)
cv2.waitKey()
cv2.imshow('photo', man)
cv2.waitKey()
cv2.destroyAllWindows()

man3[30:180, 260:360, ::] = iron[0:150, 430:530, ::]
iron3[0:150, 430:530, ::] = man[30:180, 260:360, ::]

cv2.imshow('photo', man3)
cv2.waitKey()
cv2.imshow('photo', iron3)
cv2.waitKey()
cv2.destroyAllWindows()