#!/bin/bash
rm -rf build/
yarn build
tar -czvf build.tar.gz build/
scp build/ tencent_vm:/usr/pitaya/front-end/
