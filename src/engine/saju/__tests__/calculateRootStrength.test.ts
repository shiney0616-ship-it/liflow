import { calculateRootStrength } from '../strength/root/calculateRootStrength';

describe('calculateRootStrength', () => {
    it('己土 일간의 네 지지 통근을 계산한다', () => {
        const result = calculateRootStrength(
            '己',
            [
                {
                    position: 'year',
                    branch: '午',
                },
                {
                    position: 'month',
                    branch: '巳',
                },
                {
                    position: 'day',
                    branch: '丑',
                },
                {
                    position: 'hour',
                    branch: '戌',
                },
            ],
        );

        expect(result.roots).toEqual([
            expect.objectContaining({
                position: 'year',
                branch: '午',
                rootType: 'middle',
                baseScore: 7,
                modifier: 0,
                score: 7,
            }),

            expect.objectContaining({
                position: 'month',
                branch: '巳',
                rootType: 'initial',
                baseScore: 3,
                modifier: 0,
                score: 3,
            }),

            expect.objectContaining({
                position: 'day',
                branch: '丑',
                rootType: 'main',
                baseScore: 12,
                modifier: 0,
                score: 12,
            }),

            expect.objectContaining({
                position: 'hour',
                branch: '戌',
                rootType: 'main',
                baseScore: 12,
                modifier: 0,
                score: 12,
            }),
        ]);

        expect(result.totalScore).toBe(30);
        expect(result.details).toHaveLength(4);
    });

    it('일간과 같은 오행의 지장간이 없으면 통근 점수는 0이다', () => {
        const result = calculateRootStrength(
            '甲',
            [
                {
                    position: 'year',
                    branch: '酉',
                },
            ],
        );
    
        expect(result.roots).toEqual([
            expect.objectContaining({
                position: 'year',
                branch: '酉',
                rootType: 'none',
                baseScore: 0,
                modifier: 0,
                score: 0,
            }),
        ]);
    
        expect(result.totalScore).toBe(0);
        expect(result.details).toHaveLength(1);
    });
});