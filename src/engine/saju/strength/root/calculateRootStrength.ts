import type {
    BranchPosition,
    Stem,
} from '../../types';

import { createScoreDetail } from '../createScoreDetail';
import { StrengthAccumulator } from '../StrengthAccumulator';

import type {
    RootResult,
    RootStrengthResult,
    RootType,
} from './types';

import { findRootHiddenStem } from './findRootHiddenStem';
import { ROOT_STRENGTH_POLICY } from './rootStrengthPolicy';

const MAX_ROOT_SCORE = 30;

export function calculateRootStrength(
    dayStem: Stem,
    branches: BranchPosition[],
): RootStrengthResult {
    const accumulator = new StrengthAccumulator();
    const roots: RootResult[] = [];

    for (const { position, branch } of branches) {
        const hiddenStem = findRootHiddenStem(
            branch,
            dayStem,
        );

        const rootType: RootType =
            hiddenStem?.role ?? 'none';

        const policy =
            ROOT_STRENGTH_POLICY[rootType];

        const detail = createScoreDetail({
            category: 'root',
            baseScore: policy.baseScore,
            reasonCode: policy.reasonCode,
            metadata: {
                position,
                branch,
                rootType,
                hiddenStem: hiddenStem?.stem,
            },
        });

        accumulator.add(detail);

        roots.push({
            position,
            branch,
            rootType,
            baseScore: detail.baseScore,
            modifier: detail.modifier,
            score: detail.score,
        });
    }

    const rawTotalScore =
        accumulator.getTotalScore();

    return {
        roots,
        totalScore: Math.min(
            rawTotalScore,
            MAX_ROOT_SCORE,
        ),
        details: accumulator.getDetails(),
    };
}