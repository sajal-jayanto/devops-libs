# Create a postgres Database in linux cmd 

### Update packages
```
sudo apt update
sudo apt upgrade -y
```

### Install PostgreSQL
```
sudo apt install postgresql postgresql-contrib -y
```

### Check PostgreSQL status
```
sudo systemctl status postgresql
```

### Switch to the PostgreSQL user
```
sudo -u postgres -i
-------
Open PostgreSQL with cmd: psql
```

### Create a database and user
```
CREATE USER myuser WITH PASSWORD 'my_password';
```


# Create a postgres DB replication

## PRIMARY DB SERVER 

### Connect to PostgreSQL to create the replication user
```
sudo -u postgres psql
CREATE ROLE replicator WITH REPLICATION LOGIN ENCRYPTED PASSWORD 'YourSecurePassword'; 
```

### Open postgresql.conf to allow connections and configure WAL logs
```
sudo nano /etc/postgresql/*/main/postgresql.conf
```

### Add or update these lines inside the file, then save and exit
```
listen_addresses = '*'
wal_level = replica
max_wal_senders = 10
wal_keep_size = 1024MB
hot_standby = on
```

### Open pg_hba.conf to authorize the standby server IP
```
host replication replicator <replica-server-ip> scram-sha-256
```
```
host    replication    replicator    192.168.1.20/32    scram-sha-256
```
###  Restart PostgreSQL to apply all configuration changes
```
sudo systemctl restart postgresql
```

## REPLICA DB SERVER 

### Stop the running PostgreSQL service
```
sudo systemctl stop postgresql
```

### Delete the existing empty or default data directory files
```
sudo rm -rf /var/lib/postgresql/16/main/*
```

### Copy the entire data directory from the primary server and generate the standby config (-R flag)
```
sudo -u postgres pg_basebackup -h <primary-server-ip> -D /var/lib/postgresql/16/main/ -U replicator -P -R -X stream
```
<span style="color: red;"> Enter the password as you created the primary replicator user</span>

### Start the PostgreSQL service to begin streaming replication
```
sudo systemctl start postgresql
```

## VERIFICATION (PRIMARY SERVER)

### Connect to psql to check if the standby is streaming successfully
```
sudo -u postgres psql -c "SELECT application_name, client_addr, state, sync_state FROM pg_stat_replication;"
```

## VERIFICATION (REPLICA SERVER)

### Connect to psql to confirm the node is running in read-only recovery mode (Should return 't' for true)
```
sudo -u postgres psql -c "SELECT pg_is_in_recovery();"
```