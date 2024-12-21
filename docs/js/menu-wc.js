'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">find-a-tutor documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountsModule.html" data-type="entity-link" >AccountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' : 'data-bs-target="#xs-controllers-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' :
                                            'id="xs-controllers-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' }>
                                            <li class="link">
                                                <a href="controllers/AccountsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' : 'data-bs-target="#xs-injectables-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' :
                                        'id="xs-injectables-links-module-AccountsModule-7fb3cf2daf39cbe8e460840aea02acb61c15e8f0cf266dc7d5920ce5478060caacc25eb604e5f4689972415ef870e4c1d637b3a3530b7a6fc919cb8cb735f0d2"' }>
                                        <li class="link">
                                            <a href="injectables/AccountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' :
                                            'id="xs-controllers-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' :
                                        'id="xs-injectables-links-module-AdminModule-844f7bc8d5ae0ca95daffa41f7acbfed0a713d60edc58f20d44463639b8b1b6a5063a4ceff04272ab616058f884599556940f86bcbfea612df000e87f60b5478"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' :
                                            'id="xs-controllers-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' :
                                        'id="xs-injectables-links-module-AuthModule-c95d73e8da61b00c340f5194b8674bcae17e3573bc7204dab75b69b2b8c29121e792a3e4438ab0be0aec513917670923dfda5888c187f471477e240499625296"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' : 'data-bs-target="#xs-controllers-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' :
                                            'id="xs-controllers-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' : 'data-bs-target="#xs-injectables-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' :
                                        'id="xs-injectables-links-module-CommentsModule-36c8828c7d3e3bf67d379f7fbd48f68575f022d0b0f50bafa1c7333dd35fb77da631e88a1bb767c25953b359bc732373f564ca49fb3a1a947bcf4baf0ced0e4b"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailerModule.html" data-type="entity-link" >MailerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailerModule-c5a162eb09ad31e156606765aac42487edb869d8ca2d6edb90334ac911b6d581e496ef8a1a81149f568b9fe46c531bcb95fda97194466fdc6f3a0234f317d24b"' : 'data-bs-target="#xs-injectables-links-module-MailerModule-c5a162eb09ad31e156606765aac42487edb869d8ca2d6edb90334ac911b6d581e496ef8a1a81149f568b9fe46c531bcb95fda97194466fdc6f3a0234f317d24b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailerModule-c5a162eb09ad31e156606765aac42487edb869d8ca2d6edb90334ac911b6d581e496ef8a1a81149f568b9fe46c531bcb95fda97194466fdc6f3a0234f317d24b"' :
                                        'id="xs-injectables-links-module-MailerModule-c5a162eb09ad31e156606765aac42487edb869d8ca2d6edb90334ac911b6d581e496ef8a1a81149f568b9fe46c531bcb95fda97194466fdc6f3a0234f317d24b"' }>
                                        <li class="link">
                                            <a href="injectables/MailerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SeedersModule.html" data-type="entity-link" >SeedersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SeedersModule-af29b3ad6fa0901c6fe9a839e8e7a869e18dfa02eb8f45ca80548fee078a2ad24ad361ec5f6606f310d55df6e84a8f3cacb551b62f21ad4c7a2118097e803cba"' : 'data-bs-target="#xs-injectables-links-module-SeedersModule-af29b3ad6fa0901c6fe9a839e8e7a869e18dfa02eb8f45ca80548fee078a2ad24ad361ec5f6606f310d55df6e84a8f3cacb551b62f21ad4c7a2118097e803cba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeedersModule-af29b3ad6fa0901c6fe9a839e8e7a869e18dfa02eb8f45ca80548fee078a2ad24ad361ec5f6606f310d55df6e84a8f3cacb551b62f21ad4c7a2118097e803cba"' :
                                        'id="xs-injectables-links-module-SeedersModule-af29b3ad6fa0901c6fe9a839e8e7a869e18dfa02eb8f45ca80548fee078a2ad24ad361ec5f6606f310d55df6e84a8f3cacb551b62f21ad4c7a2118097e803cba"' }>
                                        <li class="link">
                                            <a href="injectables/AdminSeeder.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminSeeder</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentSeeder.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSeeder</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TutorSeeder.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TutorSeeder</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TwilioModule.html" data-type="entity-link" >TwilioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' : 'data-bs-target="#xs-controllers-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' :
                                            'id="xs-controllers-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' }>
                                            <li class="link">
                                                <a href="controllers/TwilioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwilioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' : 'data-bs-target="#xs-injectables-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' :
                                        'id="xs-injectables-links-module-TwilioModule-78bdb25f005d357b484e25d6be9919215b14a27397e937ae964d17ec07005ce65711deb0e134cc30286b70cff2cac28f18bd37ed759dee83757362638d623d33"' }>
                                        <li class="link">
                                            <a href="injectables/TwilioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwilioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' :
                                            'id="xs-controllers-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' :
                                        'id="xs-injectables-links-module-UsersModule-fd9a5953fbf63c2d6e7c0904681e9943f7243d9519f4c87748dbf83a78a8605ba4c97c9f06729f48bd42833f9241026f1136f9b6daf177bc860609741cb77ca0"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountActivationRequest.html" data-type="entity-link" >AccountActivationRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountActivationRequestDto.html" data-type="entity-link" >AccountActivationRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountDto.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectDto.html" data-type="entity-link" >ConnectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailDto.html" data-type="entity-link" >EmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MailDto.html" data-type="entity-link" >MailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageDto.html" data-type="entity-link" >MessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessagesGateway.html" data-type="entity-link" >MessagesGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneNumberDto.html" data-type="entity-link" >PhoneNumberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestDto.html" data-type="entity-link" >RequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link" >Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tutor.html" data-type="entity-link" >Tutor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStudentDto.html" data-type="entity-link" >UpdateStudentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTutorDto.html" data-type="entity-link" >UpdateTutorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailCodeDto.html" data-type="entity-link" >VerifyEmailCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyPhoneNumberCodeDto.html" data-type="entity-link" >VerifyPhoneNumberCodeDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/HashPasswordPipe.html" data-type="entity-link" >HashPasswordPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenPipe.html" data-type="entity-link" >RefreshTokenPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerifyAccessTokenMiddleware.html" data-type="entity-link" >VerifyAccessTokenMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccountActivationRequest.html" data-type="entity-link" >IAccountActivationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComment.html" data-type="entity-link" >IComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConnect.html" data-type="entity-link" >IConnect</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMail.html" data-type="entity-link" >IMail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMessage.html" data-type="entity-link" >IMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPhoneNumber.html" data-type="entity-link" >IPhoneNumber</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegister.html" data-type="entity-link" >IRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponse.html" data-type="entity-link" >IResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IVerifyCode.html" data-type="entity-link" >IVerifyCode</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});