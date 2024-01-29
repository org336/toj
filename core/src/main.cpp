#include <iostream>
#include <config.h>
#include <util.h>
#include <format>
using std::cout, std::string, std::endl;
int main(int argc, char **argv)
{
    cout << "Hello World!" << endl;
    cout << "Version: " << STR(PROJECT_VERSION) << endl;
    cout << "Time:" << STR(PROJECT_BUILD_TIME) << endl;
    auto s = std::format("{:15}", "some_string");
    cout << s << "22" << endl;


    string arg = argv[1];
    if(arg == "0")
        return 0;
    else
        return 1;
}