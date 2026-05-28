fn main() {
    std::env::set_var("__GL_THREADED_OPTIMIZATIONS", "0");
    std::env::set_var("__NV_DISABLE_EXPLICIT_SYNC", "1");
    tauri_build::build()
}
