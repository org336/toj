#include <gtest/gtest.h>
#include <cstring>
#include <cstdlib>
#include <iostream>
#include <vector>
#include <numeric>
#include <ranges>
#include <array>
#include <memory>
#include <boost/smart_ptr/shared_ptr.hpp>
#include <charconv>
#include <any>
using namespace std;
using std::cout, std::endl, std::ranges::views::iota;
namespace views = std::ranges::views;
class A
{
};
int main(int argc, char **argv)
{
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
    // EXPECT_EQ(22, 22);
}
constexpr auto funcf(int d)
{
    int ds = 3;
    std::cin >> ds;
    if (d > 2)
        return d + 2;
    else
        return d;
}
auto func(auto k)
{
    k.push_back(3);
    return k;
}
enum class Day : int
{
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};

std::tuple<int, double> func()
{
    return std::tuple(1, 2.2);
}

const char *GetStringDyn()
{
    return "dynamic init";
}
constexpr const char *GetString(bool constInit)
{
    return constInit ? "constant init" : "2";
}
constinit const char *a = GetString(true);  // ✔
constinit const char *b = GetString(false); // ❌
TEST(sample_test_case, sample_test_3)
{
    cout << 123;
}