use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn make_menu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let open_file = CustomMenuItem::new("open_file".to_string(), "Open File");
    let submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(open_file)
            .add_item(quit)
            .add_item(close),
    );
    let menu = Menu::new().add_submenu(submenu);

    return menu;
}
