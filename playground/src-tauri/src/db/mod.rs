extern crate rocksdb;
use rocksdb::{DBCommon, DBIteratorWithThreadMode, DBWithThreadMode, Options, SingleThreaded, DB};

fn make_db_path() -> String {
    let home_dir = tauri::api::path::home_dir().unwrap();
    // create folder .playground
    let mut path = home_dir.join(".playground");
    std::fs::create_dir_all(path.clone()).unwrap();
    // create file db
    path = path.join("db.db");
    // return path
    path.to_str().unwrap().to_string()
}

pub fn put(k: &str, v: &str) {
    let path = make_db_path();
    let db = DB::open_default(path).unwrap();
    db.put(k, v).unwrap();
    println!("SET key: {}, value: {}", k, v);
}

pub fn get(k: &str) -> String {
    let path = make_db_path();
    let db = DB::open_default(path).unwrap();
    let value = db.get(k).unwrap();
    match value {
        Some(v) => {
            let s = String::from_utf8(v).unwrap();
            println!("GET SOME key: {}, value: {}", k, s);
            return s;
        }
        None => {
            println!("GET NONE key: {}, value: None", k);
            return String::from("None");
        }
    }
}
