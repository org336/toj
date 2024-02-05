#include <iostream>
#include <vm.hpp>
#include <unistd.h>
#include <format>
#include <pwd.h>
#include <grp.h>
#include <memory>
#include <fstream>
#include <curl/curl.h>
namespace toj::core::vm
{

    size_t CurlWrite_CallbackFunc_StdString(void *contents, size_t size, size_t nmemb, std::string *s)
    {
        size_t newLength = size * nmemb;
        try
        {
            s->append((char *)contents, newLength);
        }
        catch (std::bad_alloc &e)
        {
            // handle memory problem
            return 0;
        }
        return newLength;
    }

    static auto _envCheck = []()
    {
        if (auto result = std::system("docker --version > /dev/null 2>&1"); result != 0)
            throw std::runtime_error("Docker is not installed.");

        // check current user is root or not
        auto uid = getuid();
        const auto pw = getpwuid(uid);
        if (pw == nullptr)
            throw std::runtime_error("Unknown user.");
        std::cout << std::format("current uid is {}, id is {}.", uid, pw->pw_name) << std::endl;

        CURL *curl = curl_easy_init();

        // send GET /containers/json to  unix:///var/run/docker.sock
        using namespace std::string_literals;
        std::string url = "unix://%2Fvar%2Frun%2Fdocker.sock/containers/json"s;
        curl_easy_setopt(curl, CURLOPT_UNIX_SOCKET_PATH, "/var/run/docker.sock");
        curl_easy_setopt(curl, CURLOPT_URL, "http://v1.44/info");
        using curl_write_callback = size_t (*)(void *, size_t, size_t, void *);
        auto writefunc = [](void *ptr, size_t size, size_t nmemb, void *stream) -> size_t
        {
            std::string *str = (std::string *)stream;
            (*str).append((char *)ptr, size * nmemb);
            return nmemb * size;
        };
        curl_easy_setopt(
            curl, CURLOPT_WRITEFUNCTION, static_cast<curl_write_callback>(writefunc));
        std::string response;
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
        if (auto res = curl_easy_perform(curl); res != CURLE_OK)
            throw std::runtime_error(std::format("Failed to get Docker info. Return Code: {}, for more info check {}. (maybe it is because of your permission.)", static_cast<std::underlying_type<CURLcode>::type>(res), "https://curl.haxx.se/libcurl/c/libcurl-errors.html"s));
        auto d = curl_easy_perform(curl);
        curl_easy_cleanup(curl);

        // check proxy
        if (auto result = std::system("docker run hello-world > /dev/null 2>&1"); result != 0)
            throw std::runtime_error("Current user is not able to run Docker. (maybe it is because of your internet access)");
        return true;
    }();

    VmHost::VmHost()
    {
        std::cout << "VM::VM()" << std::endl;
        int result = std::system("docker run hello-world");
        if (result != 0)
        {

            throw std::runtime_error("Failed to run Docker Hello World demo.");
        }
        std::cout << "run docker succeed!" << std::endl;
    }

    void VmHost::_envCheck()
    {
        // std::cout << "VM::_envCheck()" << std::endl;
        // auto dockerCheck = []()
        // {
        //     if (auto result = std::system("docker --version > /dev/null 2>&1"); result != 0)
        //         throw std::runtime_error("Docker is not installed.");
        //     else
        //         return true;
        // }();
    }
}