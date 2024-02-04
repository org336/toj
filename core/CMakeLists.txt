cmake_minimum_required(VERSION 3.22.0)
project(toj-core VERSION 3.2.1 LANGUAGES C CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)


set(Boost_DIR "${CMAKE_CURRENT_SOURCE_DIR}/libs/boost_1_84_0/stage/lib/cmake/Boost-1.84.0")
find_package(Boost CONFIG REQUIRED)
# set(
# set(CURL_LIBRARY /usr/lib/x86_64-linux-gnu/)
set(CURL_LIBRARY "${CMAKE_CURRENT_SOURCE_DIR}/libs/curl-8.6.0/lib")
set(CURL_INCLUDE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/libs/curl-8.6.0/include")
find_package(CURL REQUIRED)

# include(CTest)
enable_testing()
# add_test(NAME Test_0 COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "0")
# add_test(NAME Test_1 COMMAND "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}" "1")

include(GoogleTest)
set(GTest_DIR "${CMAKE_CURRENT_SOURCE_DIR}/libs/googletest/lib/cmake/GTest")
find_package(GTest REQUIRED) # sudo apt-get install libgtest-dev
# include_directories(${GTEST_INCLUDE_DIRS})
# gtest_add_tests(TARGET "${PROJECT_NAME}_TEST" SOURCES ${TEST_FILES})

include_directories(include ${EXTRA_INCLUDES} ${Boost_INCLUDE_DIRS} ${CURL_INCLUDE_DIRS})
set(CMAKE_INSTALL_PREFIX ${CMAKE_BINARY_DIR}/install) 
set(PROGRAM_PERMISSIONS_DEFAULT
    OWNER_WRITE OWNER_READ OWNER_EXECUTE
    GROUP_READ GROUP_EXECUTE
    WORLD_READ WORLD_EXECUTE)
add_subdirectory(vm)
list(APPEND EXTRA_LIBS tvm)
list(APPEND EXTRA_INCLUDES vm/include)
message(${EXTRA_INCLUDES})
message(${GTEST_LIBRARIES})
message(${CURL_INCLUDE_DIRS})



get_property(dirs DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} PROPERTY INCLUDE_DIRECTORIES)
foreach(dir ${dirs})
  message(STATUS "dir='${dir}'")
endforeach()

message(${CURL_INCLUDE_DIRS})
message(${CURL_INCLUDE_DIRS})
message(${CURL_INCLUDE_DIRS})
message(${CURL_INCLUDE_DIRS})
message(${CURL_INCLUDE_DIRS})
message(${CURL_INCLUDE_DIRS})

string(TIMESTAMP PROJECT_BUILD_TIME "%Y-%m-%d %H:%M:%S")
configure_file(config.h.in config.h) # 生成 config.h 头文件

file(GLOB SRC_FILES "src/*.cpp") # 获取 src 目录下的所有 .cpp 文件
add_executable(${PROJECT_NAME} ${SRC_FILES})
target_link_libraries(${PROJECT_NAME} PUBLIC ${EXTRA_LIBS} ${Boost_LIBRAIES}) # 编译所有源文件
target_include_directories(${PROJECT_NAME} PUBLIC ${PROJECT_BINARY_DIR} ./vm/include) # 将二进制目录添加到 include 目录中，以便能够找到 config.h



file(GLOB TEST_FILES "src/test/*.cpp")
add_executable(${PROJECT_NAME}_test ${TEST_FILES})
target_link_libraries(${PROJECT_NAME}_test ${GTEST_LIBRARIES} ${GTEST_MAIN_LIBRARIES} ${Boost_LIBRAIES} pthread)
gtest_discover_tests(${PROJECT_NAME}_test WORKING_DIRECTORY ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})