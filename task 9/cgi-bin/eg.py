#!/usr/bin/python3

import cgi
from subprocess import getoutput

print('Content-type: text/html')
print('Access-Control-Allow-Origin: *')
print('')

fs = cgi.FieldStorage()
cmd = fs.getvalue('cmd')
out = getoutput('sudo ' + cmd)

print(out)