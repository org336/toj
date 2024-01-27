file(GLOB SRC_FILES "src/*.cpp") # 获取 src 目录下的所有 .cpp 文件
add_library(${PROJECT_NAME}_LIB ${SRC_FILES})