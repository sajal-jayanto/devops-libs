#!/bin/sh

x=10
if [ $x -eq 10 ]; then
  echo "yes x is $x"
fi

y=10
if [ $x -eq 10 ] && [ $y -eq 10 ]; then
  echo "x and you both 10"
fi

if [ $x -eq 12 ]; then
  echo "x is 10"
else 
  echo "x is not 10"
fi 

if [ $x -eq 12 ]; then
  echo "x is 12"
elif [ $x -eq 10 ]; then
  echo "x is 10 elif"
else 
  echo "x is not 10"
fi 


