<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <h1 class="title">欢迎来到422管家婆信息管理系统</h1>
      <p class="subtitle">您的智能信息管理助手</p>
      <button class="login-button" @click="navigateToLogin">进入系统</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToLogin() {
      // 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: 400% 400%;
  animation: backgroundAnimation 14s infinite alternate;
  color: #fff;
}

@keyframes backgroundAnimation {
  0% {
    background-color: #ff9a9e;
  }
  16.66% {
    background-color: #fad0c4;
  }
  33.33% {
    background-color: #a1c4fd;
  }
  50% {
    background-color: #c2e9fb;
  }
  66.66% {
    background-color: #fbc2eb;
  }
  83.33% {
    background-color: #fad0c4;
  }
  100% {
    background-color: #fccb90;
  }
}

.welcome-content {
  text-align: center;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 3.5em;
  margin-bottom: 0.5em;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  animation: titleAnimation 3s infinite alternate;
}

@keyframes titleAnimation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.subtitle {
  font-size: 1.8em;
  margin-bottom: 1.5em;
  color: #f7e7ce;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.login-button {
  padding: 1em 2.5em;
  font-size: 1.2em;
  color: #ffffff;
  background-color: #ff9a9e;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #a1c4fd;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}
</style>
