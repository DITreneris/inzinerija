type ModuleCandidate = {
  id: number;
};

export interface PickModulesPageNextStepInput<TModule extends ModuleCandidate> {
  modules: TModule[];
  completedModuleIds: readonly number[];
  moduleProgressById: ReadonlyMap<number, number>;
  lockedModuleIds: ReadonlySet<number>;
  recommendedModuleIds: ReadonlySet<number>;
  maxAccessible: number;
}

function isAccessibleModule<TModule extends ModuleCandidate>(
  module: TModule,
  lockedModuleIds: ReadonlySet<number>,
  maxAccessible: number
): boolean {
  return module.id <= maxAccessible && !lockedModuleIds.has(module.id);
}

function isIncomplete(
  moduleId: number,
  completedModuleIds: readonly number[],
  moduleProgressById: ReadonlyMap<number, number>
): boolean {
  return (
    !completedModuleIds.includes(moduleId) &&
    (moduleProgressById.get(moduleId) ?? 0) < 100
  );
}

export function pickModulesPageNextStep<TModule extends ModuleCandidate>({
  modules,
  completedModuleIds,
  moduleProgressById,
  lockedModuleIds,
  recommendedModuleIds,
  maxAccessible,
}: PickModulesPageNextStepInput<TModule>): TModule | null {
  const accessible = modules.filter((module) =>
    isAccessibleModule(module, lockedModuleIds, maxAccessible)
  );

  const started = accessible.find((module) => {
    const progress = moduleProgressById.get(module.id) ?? 0;
    return (
      progress > 0 && progress < 100 && !completedModuleIds.includes(module.id)
    );
  });
  if (started) return started;

  const recommended = accessible.find(
    (module) =>
      recommendedModuleIds.has(module.id) &&
      isIncomplete(module.id, completedModuleIds, moduleProgressById)
  );
  if (recommended) return recommended;

  return (
    accessible.find((module) =>
      isIncomplete(module.id, completedModuleIds, moduleProgressById)
    ) ?? null
  );
}
