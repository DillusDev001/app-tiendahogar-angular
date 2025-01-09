import { Router } from "@angular/router";


export function goDepositantes(router: Router) {
    router.navigate(['/index/depositantes']);
}

export function goViewDepositante(router: Router) {
    router.navigate(['/index/depositantes/view']);
}