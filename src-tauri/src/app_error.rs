use thiserror::Error;

#[derive(Error, Debug)]
pub enum AutomationError {
    #[error("Capture error")]
    Capture(#[from] xcap::XCapError),

    #[cfg(target_os = "windows")]
    #[error("Windows error")]
    Windows(#[from] windows::core::Error),
    #[cfg(target_os = "windows")]
    #[error("UIAutomation error")]
    UIAError(#[from] uiautomation::errors::Error),
}
