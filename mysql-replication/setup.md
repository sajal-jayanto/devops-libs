## Install MySQL on both EC2 instances

```
sudo apt update
sudo apt install mysql-server -y
sudo systemctl enable --now mysql
mysql --version
```


### Configure the primary 

```
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

### Under [mysqld], add or update these settings:
```
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
binlog_format = ROW
bind-address = 0.0.0.0
```

### Restart MySQL:
```
sudo systemctl restart mysql
sudo systemctl status mysql
```

### Create a replication account. Replace the example replica IP with its actual private IP:

```
CREATE USER 'replicator'@'<replica-server-ip>'
IDENTIFIED BY 'strong-password';

GRANT REPLICATION SLAVE ON *.*
TO 'replicator'@<replica-server-ip>';
```

### Show all user in mysql
```
SELECT user, host FROM mysql.user zORDER BY user, host;
```

### Drop user 
```
DROP USER 'username'@'host';
```

### Check the binary log coordinates
```
SHOW BINARY LOG STATUS;
```

## Configure the replica

```
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

### Add these settings under [mysqld]
```
server-id = 2
relay_log = /var/log/mysql/mysql-relay-bin.log
read_only = ON
```

### Restart MySQL
```
sudo systemctl restart mysql
sudo systemctl status mysql
```

### Run the following SQL, replacing the IP, password, log filename and position with the values from your primary
```
CHANGE REPLICATION SOURCE TO
    SOURCE_HOST = '<master-server-ip>',
    SOURCE_PORT = 3306,
    SOURCE_USER = 'replicator',
    SOURCE_PASSWORD = 'password',
    SOURCE_LOG_FILE = 'mysql-bin.000001', # show the binary log in primary and get the file name <SHOW BINARY LOG STATUS;>
    SOURCE_LOG_POS = 157, # show the binary log in primary and get the posation <SHOW BINARY LOG STATUS;>
    GET_SOURCE_PUBLIC_KEY = 1;
```
##### CDM
    ## See ditelas cmd
    - SHOW REPLICA STATUS\G
    
    ## Start and stop commend 
    - STOP REPLICA;
    - START REPLICA;

