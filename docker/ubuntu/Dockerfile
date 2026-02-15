FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Paris

RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    curl \
    vim \
    git \
    htop \
    python3 \
    python3-pip \
    postgresql \
    postgresql-contrib \
    python3-psycopg2 \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir /run/sshd

RUN echo "ansible ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config \
 && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

USER postgres
RUN /etc/init.d/postgresql start \
 && psql -c "ALTER USER postgres WITH PASSWORD 'ansible';" \
 && sed -i "s/local\s\+all\s\+all\s\+peer/local all all md5/" /etc/postgresql/14/main/pg_hba.conf \
 && sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/14/main/postgresql.conf

USER root

EXPOSE 22 5432

CMD service postgresql start && /usr/sbin/sshd -D
