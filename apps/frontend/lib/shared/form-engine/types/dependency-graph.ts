import { UseFormReturn, FieldValues } from "react-hook-form";
import { Path } from "react-hook-form";

export type DependencyGraph<T extends FieldValues> = Map<Path<T>, Path<T>[]>;
