#include <gtest/gtest.h>
#include <cstring>
#include <cstdlib>
#include <iostream>
#include <vector>
#include <numeric>
#include <ranges>
#include <array>
#include <memory>
using std::cout, std::endl, std::ranges::views::iota;
namespace views = std::ranges::views;
int main(int argc, char **argv)
{
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
    // EXPECT_EQ(22, 22);
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

TEST(sample_test_case, sample_test_3)
{

auto dsdsd = static_cast<std::underlying_type_t<Day>>(Day::Monday);
    auto up = std::make_unique<int>(5);
    auto ds = func(std::vector<int>());
    // func(3.2);
    cout << 1;
    int *ptr = new int;
    std::unique_ptr<int> p1(ptr);
    std::unique_ptr<int> p2(std::move(p1)); // 错误

    int *sdd = new int(3);
    std::shared_ptr<int> b(sdd);
    std::weak_ptr<int> pddyy(b);
    int *pp = new int(3);
    std::shared_ptr<int> ddsds{std::move(sdd)};
    std::shared_ptr<int> k{new int(3)};
    b = k;
    std::shared_ptr<int> sd{k};
    std::shared_ptr<int> ksd(k);

    std::shared_ptr<int> sdff{std::move(k)};

    cout << 1;
}
