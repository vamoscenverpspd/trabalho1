#!/bin/bash

virsh --connect qemu:///system define VM1.xml

virsh --connect qemu:///system define VM2.xml

virsh --connect qemu:///system define VM3.xml
