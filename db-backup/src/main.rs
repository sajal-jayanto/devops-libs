use std::process::{Command, Stdio};
use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
  let database = "appdb";
  let user = "postgres";
  let backup_dir = "/var/backups/postgres";

  fs::create_dir_all(backup_dir)
    .expect("Failed to create backup directory");

  let timestamp = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_secs();

  let backup_file = format!(
    "{}/{}_{}.sql.gz",
    backup_dir,
    database,
    timestamp
  );

  println!("Starting backup...");
  println!("Backup file: {}", backup_file);

  let pg_dump = Command::new("pg_dump")
    .arg("-U")
    .arg(user)
    .arg(database)
    .stdout(Stdio::piped())
    .spawn()
    .expect("Failed to start pg_dump");

  let pg_dump_output = pg_dump
    .stdout
    .expect("Failed to get pg_dump output");

  let gzip = Command::new("gzip")
    .stdin(pg_dump_output)
    .stdout(
      std::fs::File::create(&backup_file)
      .expect("Failed to create backup file")
    )
    .spawn()
    .expect("Failed to start gzip");

  let status = gzip
    .wait_with_output()
    .expect("Failed to wait for gzip");

  if status.status.success() {
    println!("Backup successful!");
    println!("Saved to: {}", backup_file);
  } else {
    println!("Backup failed!");

    let _ = fs::remove_file(&backup_file);
    std::process::exit(1);
  }
}