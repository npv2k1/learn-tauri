// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

pub mod commands;
pub mod menus;
// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}
fn main() {
    tauri::Builder::default()
        .menu(menus::make_menu())
        .invoke_handler(tauri::generate_handler![commands::greet])
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

            // emit the `event-name` event to all webview windows on the frontend
            // app.emit_all(
            //     "click",
            //     Payload {
            //         message: "Tauri is awesome!".into(),
            //     },
            // )
            // .unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
