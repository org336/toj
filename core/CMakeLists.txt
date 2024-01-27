cmake_minimum_required(VERSION 3.0.0)
project(toj-core VERSION 3.2.1 LANGUAGES C CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)
set(CMAKE_CXX_FLAGS, "${CMAKE_CXX_FLAGS} -std=c++20")

# include(CTest)
# enable_testing()

add_subdirectory(vm)


# set(CPACK_PROJECT_NAME ${PROJECT_NAME})
# set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
# include(CPack)
file(GLOB SRC_FILES "src/*.cpp") # 获取 src 目录下的所有 .cpp 文件

string(TIMESTAMP PROJECT_BUILD_TIME "%Y-%m-%d %H:%M:%S")
configure_file(config.h.in config.h) # 生成 config.h 头文件
include_directories("./include")
add_executable(${PROJECT_NAME} ${SRC_FILES}) # 编译所有源文件
target_include_directories(${PROJECT_NAME} PUBLIC ${PROJECT_BINARY_DIR} ./vm/include) # 将二进制目录添加到 include 目录中，以便能够找到 config.h
