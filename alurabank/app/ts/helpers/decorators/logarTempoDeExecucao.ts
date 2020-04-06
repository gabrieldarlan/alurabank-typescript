export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function (target: any, propertKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;
            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }
            console.log('------------');
            console.log(`parametros passados para o método ${propertKey}:${JSON.stringify(args)} `);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`o retorno do método ${propertKey} é ${JSON.stringify(retorno)}`);
            console.log(`o metodo ${propertKey} demorou ${(t2 - t1) / divisor} ${unidade}`);

            return retorno;
        }
        return descriptor;
    }
}