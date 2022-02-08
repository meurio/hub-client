FROM alpine

WORKDIR /app

# Define rancher version
ENV RANCHER_CLI_VERSION=v0.6.13 \
	RANCHER_COMPOSE_VERSION=v0.12.5 \
	YAML_VERSION=1.6 \
	RANCHER_URL_API= \
	RANCHER_ACCESS_KEY= \
	RANCHER_SECRET_KEY= \
	RANCHER_ENVIRONMENT= \
	SERVICE_NAME= \
	DOCKER_IMAGE=

# Install dependencies and rancher
RUN apk update && \
	apk upgrade && \
	apk add --no-cache ca-certificates && \
	apk add openssh-client && \
	apk add iputils && \
	apk add iproute2 && \
	apk add curl && \
	apk add bash && \
	apk add --quiet --no-cache --virtual build-dependencies curl && \
	curl -sSL "https://github.com/rancher/cli/releases/download/${RANCHER_CLI_VERSION}/rancher-linux-amd64-${RANCHER_CLI_VERSION}.tar.gz" | tar -xz -C /usr/bin/ --strip-components=2 && \
	curl -sSL "https://github.com/rancher/rancher-compose/releases/download/${RANCHER_COMPOSE_VERSION}/rancher-compose-linux-amd64-${RANCHER_COMPOSE_VERSION}.tar.gz" | tar -xz -C /usr/bin/ --strip-components=2 && \
	chmod +x /usr/bin/rancher && \
	apk del build-dependencies && \
	rm -rf /var/cache/apk/*

# Install python3
RUN apk add --no-cache python3 \
	&& python3 -m ensurepip \
	&& pip3 install --upgrade pip setuptools \
	&& rm -r /usr/lib/python*/ensurepip && \
	if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
	if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
	rm -r /root/.cache

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY scripts.py scripts.py

RUN chmod +x /app/scripts.py

ENV PYTHONPATH /app

CMD /app/scripts.py up --image $DOCKER_IMAGE --service $SERVICE_NAME --url $RANCHER_URL_API --secret $RANCHER_SECRET_KEY --access $RANCHER_ACCESS_KEY --environment $RANCHER_ENVIRONMENT