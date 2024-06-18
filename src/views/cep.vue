<template>
    <div>
        <v-app><!-- Barra superior -->
            <v-app-bar app color="#013D6E">
                <!-- Botão para expandir/esconder menu lateral esquerdo -->
                <span style="
              color: #ffffff;
              font-size: 45px;
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            " @click.stop="drawerEsquerdo = !drawerEsquerdo" class="mdi mdi-menu"></span>
                <v-toolbar-title style="margin-left: 80px" class="white--text">CEP | Cadastro de Endereços
                    Postais</v-toolbar-title>
                <!-- Ícone mdi-help -->
                <span style="
              color: #ffffff;
              font-size: 35px;
              position: absolute;
              right: 120px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            " @click="dialogAjuda = true" class="mdi mdi-help"></span>
                <!-- Ícone mdi-apps -->
                <span style="
              color: #ffffff;
              font-size: 45px;
              position: absolute;
              right: 70px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            " class="mdi mdi-apps"></span>
                <!-- Botão para expandir/esconder menu lateral direito -->
                <span style="
              color: #ffffff;
              font-size: 45px;
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            " @click.stop="drawerDireito = !drawerDireito" class="mdi mdi-menu"></span>
            </v-app-bar>
            <!-- Menu lateral esquerdo -->
            <v-navigation-drawer v-model="drawerEsquerdo" style="background-color: #f0f3f4" app>
                <v-list-item-group>
                    <div style="
                            display: flex;
                            margin-top: 35px;
                            justify-content: space-around;
                            ">
                        <div style="cursor: pointer">
                            <v-icon size="34" color="black" :style="{
                                opacity: editarAtivado ? 1 : 0.3,
                            }">mdi-pencil</v-icon>
                        </div>
                        <div style="cursor: pointer">
                            <v-icon size="34" color="black" :style="{
                                opacity: editarAtivado ? 1 : 0.3,
                            }">mdi-undo</v-icon>
                        </div>
                        <div style="cursor: pointer">
                            <v-icon size="34" color="black" :style="{
                                opacity: editarAtivado ? 1 : 0.3,
                            }">mdi-content-save</v-icon>
                        </div>
                    </div>
                </v-list-item-group>
            </v-navigation-drawer>

            <v-main>
                <!-- Barra de Pesquisa -->
                <v-row v-if="mostrarTabela">
                    <div>
                        <v-text-field variant="outlined" label="PESQUISAR" style="
                margin-left: 70px;
                margin-top: 17px;
                width: 600px;
                height: 30px;
                line-height: 20px;
              " @keyup.enter="pesquisar(paramPesquisar)">
                            <template v-slot:prepend-inner>
                                <v-icon @click="pesquisar(paramPesquisar)">mdi-magnify</v-icon>
                            </template>
                        </v-text-field>
                    </div>
                    <div style="margin-top: 25px; margin-left: 10px">
                        <v-radio-group inline>
                            <v-radio label="Vigentes" value="3"></v-radio>
                            <v-radio label="Não Validadas" value="7"></v-radio>
                        </v-radio-group>
                    </div>
                </v-row>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import ws_cep from "../ws/cep";

export default {
    name: "App",
    data() {
        return {
            drawerEsquerdo: true,
            drawerDireito: false,
            mostrarMenusEsquerdosParametros: false,
            mostrarMenusEsquerdosAnalises: false,
            mostrarTabela: true,
            mostrarAbas: false,
            mostrarBotoesOvFavoritosMenuEsquerdo: true,
            mostrarBotoesAcoesMenuEsquerdo: false,
            menuLateralSelecionado: "",
            conteudoMenuFacilidades: "",
            editarAtivado: false,
            cep: [],
        };
    },

    methods: {
        voltarTelaPrincipal() {
            this.mostrarBotoesOvFavoritosMenuEsquerdo = true;
            this.mostrarBotoesAcoesMenuEsquerdo = false;
            this.mostrarTabela = true;
            this.mostrarAbas = false;
            this.mostrarMenusEsquerdosParametros = false;
            this.mostrarMenusEsquerdosAnalises = false;
        },

        async carregar(v) {
            console.dir("carregar")
            try {
                this.cep = await ws_cep.carregar_cep(v);
                console.dir(this.cep);
                console.dir(this.cep.ncep);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        },
    },

    created: function () {
        this.carregar('89208500')
    },
};
</script>

<style scoped>
.menu-icon-left {
    color: #ffffff;
    font-size: 45px;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.menu-icon-right {
    color: #ffffff;
    font-size: 45px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.v-navigation-drawer {
    transition: transform 0.3s ease;
}

.v-main {
    margin-top: 30px;
}

.custom-list-item-title {
    padding-left: 24px;
    font-weight: bold;
    color: black;
}

.custom-list-item {
    padding: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.class-abas {
    margin-right: 90px;
    color: "#003D6E";
    font-weight: bold;
    font-size: 16px;
}
</style>