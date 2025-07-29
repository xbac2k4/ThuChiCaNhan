export const removeRouteByName = (
  navigation: any,
  routeNameToRemove: string,
) => {
  const currentRoutes = navigation.getState().routes;
  const routeExists = currentRoutes.some(
    (r: any) => r?.name === routeNameToRemove,
  );
  if (!routeExists) {
    return;
  }
  const newRoutes = currentRoutes.filter(
    (r: any) => r?.name !== routeNameToRemove,
  );

  navigation.reset({
    index: newRoutes.length - 1,
    routes: newRoutes,
  });
};
