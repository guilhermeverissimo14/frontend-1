import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotLoggedInGuard } from './auth/guards/not-logged-in.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdmMunicipalGuard } from './auth/guards/adm-municipal.guard';
import { UbsGuard } from './auth/guards/ubs.guard';
import { AdmGeralGuard } from './auth/guards/adm-geral.guard';
import { AdmEstadualGuard } from './auth/guards/adm-estadual.guard';
import { AdmNacionalGuard } from './auth/guards/adm-nacional.guard';
import { AdmGuard } from './auth/guards/adm.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forgot-password',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password/:token',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'painel-adm-municipal',
        loadChildren: () => import('./painel-adm-municipal/painel-adm-municipal.module').then(m => m.PainelAdmMunicipalModule),
        canActivate: [AdmMunicipalGuard]
      },
      {
        path: 'painel-adm-geral',
        loadChildren: () => import('./painel-adm-geral/painel-adm-geral.module').then(m => m.PainelAdmGeralModule),
        canActivate: [AdmGeralGuard]
      },
      {
        path: 'painel-ubs',
        loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule),
        canActivate: [UbsGuard]
      },
      {
        path: 'painel-profissional-ubs',
        loadChildren: () => import('./profissional-ubs/profissional-ubs.module').then(m => m.ProfissionalUbsModule)
      },
      {
        path: 'indice-pendencia',
        loadChildren: () => import('./indice-pendencia/indice-pendencia.module').then(m => m.IndicePendenciaModule),
        canActivate: [AdmGuard]
      },
      {
        path: 'consumo-larvicidas',
        loadChildren: () => import('./consumo-larvicidas/consumo-larvicidas.module').then(m => m.ConsumoLarvicidasModule),
        canActivate: [AdmGuard]
      },
      {
        path: 'agentes-endemias',
        loadChildren: () => import('./agente-endemia/agente-endemia.module').then(m => m.AgenteEndemiaModule),
        canActivate: [AdmMunicipalGuard]
      },
      {
        path: 'ubs-municipal',
        loadChildren: () => import('./ubs-municipal/ubs-municipal.module').then(m => m.UbsMunicipalModule),
        canActivate: [AdmMunicipalGuard]
      },
      {
        path: 'ubs-estadual',
        loadChildren: () => import('./ubs-estadual/ubs-estadual.module').then(m => m.UbsEstadualModule ),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documento/documento.module').then(m => m.DocumentoModule),
        canActivate: [AdmMunicipalGuard]
      },
      { path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate: [AdmMunicipalGuard]
      },
      {
        path: 'usuarios-adm-estadual',
        loadChildren: () => import('./usuarios-adm-estadual/usuarios-adm-estadual.module').then(m => m.UsuariosAdmEstadualModule),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'painel-adm-estadual',
        loadChildren: () => import('./painel-adm-estadual/painel-adm-estadual.module').then(m => m.PainelAdmEstadualModule),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'painel-adm-nacional',
        loadChildren: () => import('./painel-adm-nacional/painel-adm-nacional.module').then(m => m.PainelAdmNacionalModule),
        canActivate: [AdmNacionalGuard]
      },
      {
        path: 'usuarios-adm-nacional',
        loadChildren: () => import('./usuarios-adm-nacional/usuarios-adm-nacional.module').then(m => m.UsuariosAdmNacionalModule),
        canActivate: [AdmNacionalGuard]
      },
      {
        path: 'documentos-adm-estadual',
        loadChildren: () => import('./documento-adm-estadual/documento-adm-estadual.module').then(m => m.DocumentoAdmEstadualModule),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'pacientes-adm-estadual',
        loadChildren: () => import('./paciente-adm-estadual/paciente-adm-estadual.module').then(m => m.PacienteAdmEstadualModule ),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'documentos-adm-nacional',
        loadChildren: () => import('./documento-adm-estadual/documento-adm-estadual.module').then(m => m.DocumentoAdmEstadualModule),
        canActivate: [AdmNacionalGuard]
      },
      {
        path: 'pacientes-adm-nacional',
        loadChildren: () => import('./paciente-adm-estadual/paciente-adm-estadual.module').then(m => m.PacienteAdmEstadualModule ),
        canActivate: [AdmNacionalGuard]
      },
      {
        path: 'agentes-endemias-adm-estadual',
        loadChildren: () => import('./agente-endemias-adm-estadual/agente-endemias-adm-estadual.module').then(m => m.AgenteEndemiasAdmEstadualModule ),
        canActivate: [AdmEstadualGuard]
      },
      {
        path: 'agentes-endemias-adm-nacional',
        loadChildren: () => import('./agente-endemias-adm-nacional/agente-endemias-adm-nacional.module').then(m => m.AgenteEndemiasAdmNacionalModule ),
        canActivate: [AdmNacionalGuard]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    )],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
