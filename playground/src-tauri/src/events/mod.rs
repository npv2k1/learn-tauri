use std::thread::sleep;
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};

use tauri::{App, Manager};

use crate::Payload;
pub fn handle_time_event(app: &mut App) {
    let interval = Duration::from_secs(1);

    let mut start_time = Instant::now();

    loop {
        // Your function to run every 1 second goes here
        // Get the current time as a `SystemTime` object
        let current_time = SystemTime::now();

        // Calculate the duration since the Unix epoch (January 1, 1970)
        let duration_since_epoch = current_time
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards");

        // Get the timestamp as a u64 representing the number of seconds since the epoch
        let timestamp = duration_since_epoch.as_secs();

        app.emit_all(
            "click",
            Payload {
                message: timestamp.to_string().into(),
            },
        )
        .unwrap();
        println!("Current timestamp: {}", timestamp);

        // Sleep for 1 second
        let elapsed_time = start_time.elapsed();
        if elapsed_time < interval {
            let sleep_duration = interval - elapsed_time;
            sleep(sleep_duration);
        }

        // Reset the start time for the next iteration
        start_time = Instant::now();
    }
}
