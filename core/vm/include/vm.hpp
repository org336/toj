namespace toj::core::vm
{
    class VmHost
    {
    public:
        // VM() = default;
        VmHost();
        ~VmHost() = default;

        void start();
        void loadTask();
        void runTask();
        void stopTask();
        void reset();
        void status();

    private:
        void _config();

        static void _envCheck();
    };
}