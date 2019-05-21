/*
 *  DO NOT EDIT FOR TEST
 */

export type Result<T, E> = Result.Success<T> | Result.Failure<E>;

export namespace Result {
    export type Handler<T, E> = (result: Result<T, E>) => void;

    export const enum Type {
        Success,
        Failure,
    }
    
    export interface Success<T> {
        readonly type: Type.Success;
        readonly value: T;
    }
    
    export interface Failure<E> {
        readonly type: Type.Failure;
        readonly error: E;
    }

    export function success<T>(value: T): Success<T> {
        return {type: Type.Success, value: value};
    }
    
    export function failure<E>(error: E): Failure<E> {
        return {type: Type.Failure, error: error};
    }
}