cmake_minimum_required(VERSION 3.0.0)
project(toj-core VERSION 3.2.1 LANGUAGES C CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)
set(CMAKE_CXX_FLAGS, "${CMAKE_CXX_FLAGS} -std=c++20")

# include(CTest)
# enable_testing()
add_subdirectory(vm)
list(APPEND EXTRA_LIBS tvm)
list(APPEND EXTRA_INCLUDES vm/includes)

include_directories("./include")

string(TIMESTAMP PROJECT_BUILD_TIME "%Y-%m-%d %H:%M:%S")
configure_file(config.h.in config.h) # 生成 config.h 头文件

file(GLOB SRC_FILES "src/*.cpp") # 获取 src 目录下的所有 .cpp 文件
add_executable(${PROJECT_NAME} ${SRC_FILES})
target_link_libraries(${PROJECT_NAME} PUBLIC ${EXTRA_LIBS}) # 编译所有源文件
target_include_directories(${PROJECT_NAME} PUBLIC ${PROJECT_BINARY_DIR} ./vm/include) # 将二进制目录添加到 include 目录中，以便能够找到 config.h
