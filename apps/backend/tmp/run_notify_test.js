(async () => {
    try {
        // ensure cwd is repository root when running
        const { notifyRealdataThreshold } = await import('../apps/backend/processing/guidanceProcessor.js');

        const payload = {
            s100206003: 55,
            s100206004: -60,
            s100206006: 30,
            s100206007: 90,
            s100100008: 12
        };

        console.log('Starting notifyRealdataThreshold test...');
        await notifyRealdataThreshold('TBM_TEST_01', payload);
        console.log('notifyRealdataThreshold completed');
    } catch (err) {
        console.error('Error during notify test:', err);
        process.exitCode = 1;
    }
})();
