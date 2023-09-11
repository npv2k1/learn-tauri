use crate::db;

#[tauri::command]
pub fn greet(name: &str) -> String {
    println!("Hello, {}!", name);
    format!("Hello, {}! You've been greeted from Rust!", name);
    return format!("Hello, {}! You've been greeted from Rust!", name);
}

#[tauri::command]
pub fn put_db(key: &str, value: &str) {
    db::put(key,value);
}

#[tauri::command]
pub fn get_db(key: &str) -> String {
    db::get(key)
}