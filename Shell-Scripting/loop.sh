#!/bin/sh

for i in 1 2 3 4 5
do 
  echo "loop... $i"
done

for i in $(seq 1 2 10)
do 
  echo "loop index .... $i"
done


CURRENT_VAR=1
while [ "$CURRENT_VAR" -ne 10 ]
do
  echo "$CURRENT_VAR"
  CURRENT_VAR=$((CURRENT_VAR + 1))
done