#!/bin/bash

sudo apt-get install -y build-essential scala golang ruby-full software-properties-common python virtualenv cpanminus

# haskal
sudo add-apt-repository -y ppa:hvr/ghc
sudo apt-get update
sudo apt-get install -y cabal-install-1.22 ghc-7.10.3
cat >> ~/.bashrc <<EOF
export PATH="\$HOME/.cabal/bin:/opt/cabal/1.22/bin:/opt/ghc/7.10.3/bin:\$PATH"
EOF
export PATH=~/.cabal/bin:/opt/cabal/1.22/bin:/opt/ghc/7.10.3/bin:$PATH
source ~/.bashrc

cd ~/haskell
cabal sandbox init
cabal update
cabal install tai64
cabal exec -- runghc tai64test.hs


# get djb's https://cr.yp.to/libtai.html
wget https://cr.yp.to/libtai/libtai-0.60.tar.gz && \
tar xzf libtai-0.60.tar.gz && \
cd libtai-0.60 && \
make

# ruby
# https://github.com/craigw/tai64
cd ~/ruby
sudo gem install tai64
ruby ./tai64.rb

# scala
cd ~/scala
# made a jar from this repo
# git clone https://github.com/soundcloud/tai64 tai64
scalac -cp "/home/dallas/scala/tai64/lib/*" TaiTest.scala
scala -cp .:/home/dallas/scala/lib/joda-time-2.2.jar:/home/dallas/scala/lib/tai64_2.10-1.0.0-SNAPSHOT.jar:/home/dallas/scala/lib/joda-convert-1.3.jar TaiTest

# Go 1
cd ~/go1
export GOPATH=~/go1
go get github.com/paulhammond/tai64
go build tai64test.go
./tai64test

# Go 2
cd ~/go2
export GOPATH=~/go2
go get github.com/cactus/tai64
go build tai64test.go
./tai64test

# Go 3
cd ~/go3
export GOPATH=~/go3
go get github.com/vektra/tai64n
go build tai64test.go
./tai64test

# python
virtualenv pythonenv
cd pythonenv
. ./bin/activate
# https://github.com/hinnerk/py-tai64
pip install tai64n

# perl
cpanm DateTime::Format::Epoch::TAI64
cd ~/perl
perl -I~/perl5/lib/perl5 -Mlocal::lib tai64.pl

# javascript
cd ~/javascript
npm install babel-cli babel-preset-node6 babel-preset-es2015
#npm install https://github.com/hl2/hl2-tai64
mkdir lib src
cd src && git clone https://github.com/hl2/hl2-tai64 && cd ..
./node_modules/.bin/babel --presets es2015 -d lib/ src/hl2-tai64/src/
nodejs tai64test.js
