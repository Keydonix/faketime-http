FROM alpine as builder
RUN apk -U add git build-base
RUN git clone https://github.com/wolfcw/libfaketime /libfaketime
WORKDIR /libfaketime
RUN make && make install

FROM alpine
COPY --from=builder /usr/local/lib/faketime/libfaketimeMT.so.1 /lib/faketime.so
ENV LD_PRELOAD="/lib/faketime.so"
ENV FAKETIME_TIMESTAMP_FILE="/faketime/faketime"
ENV FAKETIME_NO_CACHE="1"
VOLUME /faketime
