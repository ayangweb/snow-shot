use std::{env, sync::Mutex};
use tauri::command;

#[command]
pub async fn exit_app(window: tauri::Window, handle: tauri::AppHandle) {
    window.hide().unwrap();
    handle.exit(0);
}

#[command]
pub async fn get_selected_text() -> String {
    let text = match get_selected_text::get_selected_text() {
        Ok(text) => text,
        Err(_) => {
            return String::new();
        }
    };
    text
}

#[command]
pub async fn auto_start_hide_window(
    window: tauri::Window,
    auto_start_hide_window: tauri::State<'_, Mutex<bool>>,
) -> Result<(), ()> {
    let mut auto_start_hide_window = match auto_start_hide_window.lock() {
        Ok(auto_start_hide_window) => auto_start_hide_window,
        Err(_) => return Err(()),
    };

    if *auto_start_hide_window == false && env::args().any(|arg| arg == "--auto_start") {
        window.hide().unwrap();
        *auto_start_hide_window = true;
    }
    Ok(())
}

#[command]
pub async fn set_enable_proxy(enable: bool, host: String) -> Result<(), ()> {
    unsafe {
        if enable {
            std::env::set_var("NO_PROXY", "");
        } else {
            std::env::set_var("NO_PROXY", host);
        }
    }
    Ok(())
}
