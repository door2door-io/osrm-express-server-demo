FROM debian:stretch

# Credit to https://github.com/stefda/docker-osmium-tool/ for his version of this file.

ENV OSMIUM_TOOL_VERSION 1.10.0

RUN echo 'deb http://ftp.debian.org/debian stretch-backports main' >> /etc/apt/sources.list.d/backports.list
RUN apt-get update
RUN apt-get install -y \
    libprotozero-dev \
    libboost-program-options-dev \
    libbz2-dev \
    zlib1g-dev \
    libexpat1-dev \
    cmake \
    pandoc \
    wget \
    g++
RUN apt-get -t stretch-backports install -y libosmium2-dev

RUN mkdir /var/install
WORKDIR /var/install

RUN wget https://github.com/osmcode/osmium-tool/archive/v${OSMIUM_TOOL_VERSION}.tar.gz && \
    tar xzvf v${OSMIUM_TOOL_VERSION}.tar.gz && \
    rm v${OSMIUM_TOOL_VERSION}.tar.gz && \
    mv osmium-tool-${OSMIUM_TOOL_VERSION} osmium-tool

RUN cd osmium-tool && \
    mkdir build && cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && \
    make && \
    make install

ENTRYPOINT ["osmium"]

CMD ["--help"]
