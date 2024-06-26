<?php namespace App;
require_once "app/helpers.php";
require_once "app/Page.php";
require_once "app/Router.php";
require_once "app/routes.php";
require_once "app/pages.php";
require_once "app/Render.php";
/** @var Page $page */
$isHomepage = $page->view == 'home'
// todo: подготовить контроллеры для тестирования форм
?>

<!doctype html>
<html lang="ru">
<head itemscope itemtype="https://schema.org/WPHeader">
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        name="viewport">
  <meta content="ie=edge" http-equiv="X-UA-Compatible">
  <meta content="320" name="MobileOptimized">
  <meta content="True" name="HandheldFriendly">
  <?php Render::component('meta/metaMain') ?>
  <title itemprop="headline">
    <?= $page->title ?>
  </title>
  <?php Render::component('meta/favicon') ?>
  <link rel="stylesheet" href="<?= getFilePathWithHash('/assets/css/main.css'); ?>">
</head>
<body <?= $isHomepage ? 'data-page="index"' : '' ?>>
<div id="app">
  <?php Render::component('header') ?>
  <main class="main">
    <?php Render::page($page->view) ?>
  </main>
  <?php Render::component('footer') ?>
  <div id="modals">
    <?php Render::component('modals/cookie') ?>
    <?php Render::component('modals/modalMenu') ?>
    <?php Render::component('modals/menuInfo') ?>
    <?php Render::component('modals/modalLogin') ?>
    <?php Render::component('modals/modalRegistration') ?>
    <?php Render::component('modals/modalSearch') ?>
    <?php Render::component('modals/modalSizeguide') ?>
    <div class="modal-overlay" data-modal-overlay></div>
  </div>
</div>
<script src="<?= getFilePathWithHash('/assets/js/main.js'); ?>"></script>
</body>
</html>
