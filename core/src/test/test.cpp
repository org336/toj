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
int main(int argc, char **argv)
{
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
    // EXPECT_EQ(22, 22);
}
TEST(sample_test_case, sample_test_3)
{
    cout << 123;
}