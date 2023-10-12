// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



use std::{thread, time::Duration};

use tauri::Manager;

mod commands;
pub mod db;
mod menus;
mod events;
// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}
fn main() {
    tauri::Builder::default()
        .menu(menus::make_menu())
        .plugin(tauri_plugin_websocket::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::put_db,
            commands::get_db
        ])
        .setup(|app| {
            // listen to the `event-name` (emitted on any window)
            let id = app.listen_global("click", |event| {
                println!("got event-name with payload {:?}", event.payload());
            });
            println!("Listening to event with id {}", id);

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                //   window.close_devtools();
            }

            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            // app.unlisten(id);
            //       

            // let handle = thread::spawn(|| {
            //     events::handle_time_event(app); 
            // });       
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
