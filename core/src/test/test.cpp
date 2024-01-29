#include <gtest/gtest.h>

TEST(sample_test_case, sample_test_1)
{
    EXPECT_EQ(1, 1);
}

TEST(sample_test_case, sample_test_2)
{
    EXPECT_EQ(5, 5);
}

int main(int argc, char **argv)
{
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}